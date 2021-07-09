import login from 'facebook-chat-api'

export default function handler(req, res) {
  if (!req.body.appstate || !req.body.id) {
    return res.status(400).json({ validation: false, message: "Missing appstate or id", body: req.body, data: req.data });
  }
  login({ appState: req.body.appstate }, function (err, api) {
    const threadId = req.body.id;
    let timestamp = req.body.timestamp || null;
    let firstRun = timestamp == null;
    var result = []; 
    try {
      api.getThreadHistory(threadId, 50, timestamp, function (err, history) {
        if (err) {
          return res.send(500).json({ err });
        }
        if (timestamp != undefined && !firstRun) history.pop();
        firstRun = false;
        timestamp = history[0].timestamp;
        if (history.length < 2) {
          // prevent endless loop: 
          timestamp = -1; 
        }
        for (var i = 0; i < history.length; i++) {
            if (history[i].body) {
              result.push({ body: history[i].body, timestamp: history[i].timestamp, sender: history[i].senderID })
            }
            if (!history[i].attachments) {
                continue;
            }
            history[i].attachments.forEach(attachment => {
                if (attachment.type == 'audio') {
                    let url = attachment.url;
                    result.push({ url: url }); 
                }
            })
        }
        return res.status(200).json({ conversations: result.reverse(), timestamp });
      });
    } catch (e) {
      res.status(500).json({error: e});
    }
  });
}
