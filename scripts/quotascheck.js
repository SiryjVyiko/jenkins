var MAX_CLOUDLET = "environment.maxcloudletsperrec",
    SAME_NODES = "environment.maxsamenodescount",
    MAX_NODES = "environment.maxnodescount",
    SSL = "environment.jelasticssl.enabled";

var max = 10, cloudlets = 8, min = 2, resp, name, value, ssl, markup = "", q = jelastic.billing.account.GetQuotas(MAX_NODES + ";" + SAME_NODES + ";" + MAX_CLOUDLET + ";" + SSL).array || [];

for (var i = 0, n = q.length; i < n; i++) {
  name = q[i].quota.name;
  value = q[i].value;

  if (name == SSL) { 
    ssl = !!value;
    continue;
  }
  
  if (name == MAX_CLOUDLET && value < cloudlets) {
    markup = "Quota limits: " + name + " = " + value + ".  Please upgrade your account.";
    continue;
  }
  if (max >= value) {
    if (name == MAX_NODES) max = value ? value - 1 : 1;
      else if (name == SAME_NODES) max = value;
  }

}

function compareVersions(a, b) {
    a = a.split("."); b = b.split(".");
    for (var i = 0, l = Math.max(a.length, b.length), x, y; i < l; i++) {x = parseInt(a[i], 10) || 0; y = parseInt(b[i], 10) || 0; if (x != y) return x > y ? 1 : -1 }
    return 0;
}

if (compareVersions(platformVersion, '5.9') >= 0 || platformVersion.indexOf('trunk') != -1) {
    resp = {result: 0, settings: {fields: [{type: "spinner", name: "nodes", caption: "Workers", min: 0, max: max, "default": Math.min(min, max)}]}};
} else {
    resp = {result: 0};    
}

resp.ssl = ssl;

if (markup) {
resp.settings.fields.push(
  {"type": "displayfield", "cls": "warning", "height": 30, "hideLabel": true, "markup": markup},
  {"type": "compositefield","height": 0,"hideLabel": true,"width": 0,"items": [{"height": 0,"type": "string","required": true}]});
}

return resp;
