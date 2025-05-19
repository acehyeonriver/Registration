// api/opened-subjects.js

const https = require("https");

module.exports = async (req, res) => {
  const semesterId = req.query.semesterId;
  if (!semesterId) {
    return res.status(400).json({ error: "semesterId is required" });
  }

  const options = {
    hostname: "sasa-planet-api-nmrblxbu3a-du.a.run.app",
    path: `/opened-subjects?semesterId=${semesterId}`,
    method: "GET",
    headers: {
      authentication: `Bearer ${process.env.SASA_TOKEN}`,
      accept: "application/json, text/plain, */*",
      "accept-encoding": "gzip, deflate, br, zstd",
      "user-agent": "YourProxyClient"
    }
  };

  const proxy = https.request(options, (apiRes) => {
    let data = "";
    apiRes.on("data", (chunk) => data += chunk);
    apiRes.on("end", () => {
      try {
        const parsed = JSON.parse(data);
        res.status(200).json(parsed);
      } catch {
        res.status(502).json({ error: "Invalid JSON from upstream" });
      }
    });
  });

  proxy.on("error", (e) => {
    res.status(500).json({ error: e.message });
  });

  proxy.end();
};
