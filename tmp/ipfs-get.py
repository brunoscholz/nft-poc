import requests

params = (
  ('arg', 'QmSioQ78VA8hS6DZnrWWReX8MLWvSzcZobtjK322yWottz'),
)

response = requests.post('https://ipfs.infura.io:5001/api/v0/block/get', params=params)

print(response.text)
