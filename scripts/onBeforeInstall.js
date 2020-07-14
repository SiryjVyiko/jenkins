var resp = {
  result: 0,
  nodes: [
    {
      "cloudlets": 12,
      "nodeType": "jenkins2",
      "engine": "${globals.engine}",
      "displayName": "Master",
      "cluster": {
        "nodes": "${settings.nodes:1}"
      }
    }
  ]
}

return resp;
