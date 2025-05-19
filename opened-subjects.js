{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const https = require("https");\
\
module.exports = async (req, res) => \{\
  const semesterId = req.query.semesterId;\
  if (!semesterId) return res.status(400).json(\{ error: "semesterId is required" \});\
\
  const options = \{\
    hostname: "sasa-planet-api-nmrblxbu3a-du.a.run.app",\
    path: `/opened-subjects?semesterId=$\{semesterId\}`,\
    method: "GET",\
    headers: \{\
      "authentication": `Bearer $\{process.env.SASA_TOKEN\}`,\
      "accept": "application/json, text/plain, */*",\
      "accept-encoding": "gzip, deflate, br, zstd",\
      "accept-language": "en-US,en;q=0.9,ko-KR;q=0.8,ko;q=0.7",\
      "origin": "https://class.sasa.hs.kr",\
      "referer": "https://class.sasa.hs.kr/",\
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",\
      "sec-fetch-site": "cross-site"\
    \},\
  \};\
\
  const proxy = https.request(options, (apiRes) => \{\
    let data = "";\
    apiRes.on("data", (chunk) => (data += chunk));\
    apiRes.on("end", () => \{\
      try \{\
        const parsed = JSON.parse(data);\
        res.status(200).json(parsed);\
      \} catch (e) \{\
        res.status(500).json(\{ error: "Invalid JSON from upstream" \});\
      \}\
    \});\
  \});\
\
  proxy.on("error", (e) => res.status(500).json(\{ error: e.message \}));\
  proxy.end();\
\};}