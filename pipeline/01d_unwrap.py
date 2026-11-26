"""01d_unwrap.py <raw-output> <snapshot.json>: takes the snapshot JSON out of the raw output of the plugin run
(skips notice lines and unwraps the JSON string). Used by send_to_code.sh."""
import json
import sys

raw = open(sys.argv[1]).read()
i = raw.index('"{')
data = json.loads(raw[i:].strip())
if isinstance(data, str):
    data = json.loads(data)
json.dump(data, open(sys.argv[2], "w"), ensure_ascii=False)
print({k: (len(v) if isinstance(v, list) else v) for k, v in data.items()})
