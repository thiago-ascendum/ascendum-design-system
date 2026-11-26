// 08_figma_docs.js: reads every "<Component> / Documentation" frame in the Figma file and returns its content
// as JSON, so Storybook can draw the same page: header chips, the rows of named variants, the side blocks
// (Use, Measures, Key tokens, Accessibility, Open questions), the "In use" names and the footer.
// Runs inside Figma through the Plugin API (bux.sh eval). Read only: it changes nothing in the file.
// Output is saved by pipeline/08_figma_docs.sh as build/figma-docs.json.
return (async () => {
  if (figma.fileKey && figma.fileKey !== '5lhRMZkLHZijqgdigjk3J1') throw new Error('wrong file: ' + figma.fileKey);
  await figma.loadAllPagesAsync();
  const vars = await figma.variables.getLocalVariablesAsync();
  const varName = Object.fromEntries(vars.map((v) => [v.id, v.name]));
  const styleName = Object.fromEntries((await figma.getLocalTextStylesAsync()).map((s) => [s.id, s.name]));
  const fillVar = (n) => { const f = Array.isArray(n.fills) && n.fills[0]; const b = f && f.boundVariables && f.boundVariables.color; return b ? varName[b.id] : null; };
  const texts = (n) => (n.type === 'TEXT' ? [n] : (n.children || []).flatMap(texts));
  const kids = (n) => (n.children || []).filter((c) => c.visible !== false);
  const out = {};
  for (const page of figma.root.children) {
    if (/Deprecated|Internal/.test(page.name)) continue;
    for (const doc of page.children.filter((c) => c.type === 'FRAME' && / \/ Documentation$/.test(c.name))) {
      const name = doc.name.replace(/ \/ Documentation$/, '');
      const [header, body, footer] = kids(doc);
      const entry = { name, page: page.name.replace(/^[\s↳\-]+/, '').trim(), docId: doc.id, title: '', lead: '', chips: [], rows: [], inUse: [], side: [], footer: '', defaults: {} };
      if (header) {
        const hk = kids(header);
        entry.title = hk[0] && hk[0].type === 'TEXT' ? hk[0].characters : name;
        entry.lead = hk[1] && hk[1].type === 'TEXT' ? hk[1].characters : '';
        const chips = hk.find((c) => c.name === 'Chips');
        if (chips) entry.chips = kids(chips).map((c) => texts(c).map((t) => t.characters).join(' ')).filter(Boolean);
      }
      if (footer) entry.footer = texts(footer).map((t) => t.characters).join(' ');
      const [main, side] = body ? kids(body) : [];
      for (const block of main ? kids(main) : []) {
        const label = texts(block)[0] ? texts(block)[0].characters : block.name;
        if (/Every variant|^Variants$/.test(block.name) || /Every variant/.test(label)) {
          for (const row of kids(block).filter((r) => /^Row\//.test(r.name))) {
            const cellsFrame = kids(row).find((c) => c.name === 'Cells');
            const cells = [];
            for (const cell of cellsFrame ? kids(cellsFrame) : []) {
              const inst = kids(cell).find((c) => c.type === 'INSTANCE');
              const main = inst ? await inst.getMainComponentAsync() : null;
              const capt = kids(cell).find((c) => c.type === 'TEXT');
              cells.push({ label: capt ? capt.characters : '', variant: main ? main.name : null, set: main && main.parent && main.parent.type === 'COMPONENT_SET' ? main.parent.name : main ? main.name : null });
            }
            const t = kids(row).find((c) => c.type === 'TEXT');
            entry.rows.push({ title: t ? t.characters : row.name.replace(/^Row\//, ''), inverted: / · Inverted$/.test(row.name) || fillVar(row) === 'inverse-surface', cells });
          }
        } else if (/^In use$/.test(block.name)) {
          entry.inUse = kids(block).filter((c) => c.type !== 'TEXT').map((c) => ({ name: c.name, inverted: fillVar(c) === 'inverse-surface' }));
        }
      }
      for (const b of side ? kids(side) : []) {
        const bk = kids(b);
        const item = { title: bk[0] && bk[0].type === 'TEXT' ? bk[0].characters : b.name.replace(/^Block\//, ''), items: [] };
        for (const c of bk.slice(1)) {
          if (c.type === 'TEXT') { item.items.push({ kind: 'text', style: styleName[c.textStyleId] || '', text: c.characters }); continue; }
          const t = texts(c);
          if (c.name === 'Rule') item.items.push({ kind: 'rule', tag: t[0] ? t[0].characters : '', text: t[1] ? t[1].characters : '' });
          else if (c.name === 'Token') { const sw = kids(c).find((x) => x.type !== 'TEXT'); item.items.push({ kind: 'token', swatch: sw ? fillVar(sw) : null, name: t[0] ? t[0].characters : '', value: t[1] ? t[1].characters : '' }); }
          else if (c.name === 'Check') item.items.push({ kind: 'check', title: t[0] ? t[0].characters : '', text: t.slice(1).map((x) => x.characters).join(' ') });
          else item.items.push({ kind: 'row', a: t[0] ? t[0].characters : '', b: t.slice(1).map((x) => x.characters).join(' ') });
        }
        entry.side.push(item);
      }
      const set = page.findAllWithCriteria({ types: ['COMPONENT_SET', 'COMPONENT'] }).find((s) => s.name === name && (s.type === 'COMPONENT_SET' || s.parent.type !== 'COMPONENT_SET'));
      if (set) {
        entry.figmaId = set.id;
        try { for (const [k, d] of Object.entries(set.componentPropertyDefinitions)) if (d.type !== 'VARIANT' && d.type !== 'INSTANCE_SWAP') entry.defaults[k.split('#')[0]] = d.defaultValue; } catch (e) { /* no properties */ }
      }
      out[name] = entry;
    }
  }
  return { generatedAt: new Date().toISOString(), count: Object.keys(out).length, docs: out };
})();
