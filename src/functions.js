const needle = require('needle');
const {convert} = require('html-to-text');


async function GetOnlyText(urli)
{
    let a = await needle.get(urli, function(err, res){
        if (err) throw err;
        var text = convert(String(res.body), { wordwrap: 130 });
        return res.body;
    });
    return a;
}

