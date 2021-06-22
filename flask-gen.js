function getcode(x) {
    var json = x;

    var obj = JSON.parse(json);
    var _methods = [];
    var j = 0;
    $.each(obj.methods, function(v) {
        _methods[j] = `'` + obj.methods[v] + `'`;
        j++;
    });

    var merge_methods = _methods.join();
    var column = [];
    var form_name = [];
    var definer = [];
    var update = [];
    var i = 0;
    $.each(obj.field, function(k, v) {
        column[i] = k;
        form_name[i] = `'"+` + v + `+"'`;
        if (obj.methods[0] == 'get' || obj.methods[0] == 'GET') {
            definer[i] = `` + k + `=request.args.get('` + v + `')`;
        } else {
            definer[i] = `` + k + `=request.form['` + v + `']`;
        }

        update[i] = `` + k + `='"+` + v + `+"'`;
        i++;
    });

    var merge_update = update.join();
    var merge_column = column.join();
    var merge_form_name = form_name.join();
    var merge_definer = definer.join("\n");

    if (obj.init == 'insert') {
        var q = `cur.execute("INSERT INTO ${obj.table} (${merge_column}) VALUES (${merge_form_name})")`;
    } else if (obj.init == 'update') {
        var q = `cur.execute("UPDATE ${obj.table} SET ${update}")`;
    }

    var render = `
	@app.route('/${obj.route}', methods = [${merge_methods}])  
	def ${obj.def}():  
     ${merge_definer}
      
      cur = mysql.connection.cursor()
      ` + q + `
      mysql.connection.commit()
      cur.close()`;


    $("#code").val(render);
}
