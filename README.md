## Json to Flask Code Generator
Generate complete Insert &amp; Update for your Python Flask Application in a minute

| Object  | Usage                                                                                | Example        |
|---------|--------------------------------------------------------------------------------------|----------------|
| init    | To define what you want to do, Insert or Update                                      | insert, update |
| def     | Method name                                                                          | - - -          |
| methods | Method request                                                                       | POST, GET      |
| route   | Route prefix for access page                                                         | - - -          |
| table   | Table name of database where you want to make changes                                | - - -          |
| field   | In the field you have to give table's column name as key and html form name as value | - - -          |

```
"field":{
  "table_column_name":"html_form_input_name"
}
```


### Json Code
```json
{
	"init": "insert",
	"def": "add_new_user",
	"methods": ["POST"],
	"route": "adduser",
	"table": "users",
	"field": {
		"name": "user_name",
		"email": "user_email",
		"city": "user_city"
	}
}
```

### Generated Code

```Python
@app.route('/adduser', methods = ['POST'])  
def add_new_user():  
  name=request.form['user_name']
  email=request.form['user_email']
  city=request.form['user_city']
  
  cur = mysql.connection.cursor()
  cur.execute("INSERT INTO users (name,email,city) VALUES ('"+user_name+"','"+user_email+"','"+user_city+"')")
  mysql.connection.commit()
  cur.close()
```
