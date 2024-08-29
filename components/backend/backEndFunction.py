
from flask import Flask, request, jsonify, make_response, json
import mysql.connector
from mysql.connector import Error
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os


app = Flask(__name__)
CORS(app)
cwd = os.getcwd()

with open(f'{cwd}/app/config.json', 'r', encoding='utf-8') as f:
    jconfig = json.load(f)
  
app.config['SECRET_KEY'] = jconfig['secretkey']
app.config["JWT_SECRET_KEY"] = jconfig['jwtsecretkey']
app.config['JWT_TOKEN_LOCATION'] = ['headers']

jwt = JWTManager(app) 

# Database connection details
DB_CONFIG = {
    'host': '127.0.0.1',
    'port':3306,
    'database': 'groupbooking',
    'user': 'root',
    'password': 'Mysql68!',
}

# Define some example responses
responses = {
    "hello": "Hi there! How can I help you with our courses?",
    "course": "We offer a variety of courses. What subject are you interested in?",
    "book": "To book a course, please browse our menu and select the one you'd like.",
    "default": "I'm not sure how to respond to that. Can you please rephrase or ask about our courses?"
}

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '').lower()
    print(f"Received message: {user_message}")  # Log the received message
    for key in responses:
        if key in user_message:
            print(f"Response sent: {responses[key]}")  # Log the response
            return jsonify({'response': responses[key]})
    print(f"Response sent: {responses['default']}")  # Log the default response
    return jsonify({'response': responses['default']})

def get_db_connection():
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error: {e}")
        return None

@app.route('/add_group', methods=['POST'])
def add_group():
    
    data = request.json
    startDate = data.get('startDate')
    properStartDate = datetime.strptime(startDate, '%m-%d-%y').strftime('%y-%m-%d')
    #properStartDate = datetime.strptime(data.get("starDate", '%d/%m/%y'))
    print(data)
    query = """
    INSERT INTO `courses` (
        `course_name`, `start_date`, `weeks`, `times_per_week`, `max_participants`,
        `min_participants`, `description`, `preferred_day`, `preferred_time`, `status`, `price`
    ) VALUES (
        %s, %s, %s, %s, %s,
        %s, %s, %s, %s, %s, %s
    )
    """
        # Connect to the database
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor()
        
        values = (
            data.get('name'),
            properStartDate,
            int(data.get('weeks')),
            int(data.get('timesPerWeek')),
            int(data.get('maxParticipants')),
            int(data.get('minParticipants')),
            data.get('description'),
            data.get('preferredDay'),
            data.get('preferredTime'),
            data.get('status'),
            float(data.get('price'))
        )
       
        print("1")
        # Execute the query
        cursor.execute(query, values)
        connection.commit()
        print("hello")
        return jsonify({'message': 'Group created successfully!'}), 201
       
    except Error as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Error creating group', 'error': str(e)}), 500
   
    finally:
        # Clean up
        if connection.is_connected():
            cursor.close()
            connection.close()


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    print(data)
    
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor()
        query = """
        INSERT INTO `users` (
            `firstname`, `lastname`, `phone`, `email`, `password`
        ) VALUES (
            %s, %s, %s, %s, %s
        )
        """
        values = (
            data.get('firstName'),
            data.get('lastName'), 
            data.get('phone'),
            data.get('email'), 
            data.get('password')
        )
        cursor.execute(query, values)
        return jsonify({"message":"Added new user"}),200

    except Error as e:
        return jsonify({'message': 'Error creating user', 'error': str(e)}), 500
 
@app.route('/checkCookies', methods=['POST'])
@jwt_required()
def checkCookies():
    current_user = get_jwt_identity()
    current_user = "5"
    print(current_user)
    if not current_user is None:
        return "0"
    else: 
        return f'{current_user}'
       
@app.route('/bookClass', methods=['POST'])
def bookclass():
    print('ddd')
    user_id = get_jwt_identity()
    user_id = "5"
    data = request.json
    groupId = data.get("groupID")
    userId = data.get("userId")
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor()
        cursor.execute(f"insert into userbooked (user_id, group_id) values ({userId}, {groupId})")
        return jsonify("Booked")
    except Error as e:
        return jsonify({"message":"Error updating booking"}),500
    
        
@app.route('/getCourses', methods=['GET'])    
def getCourses():
    query ="select * from `courses`"
    connection = None
    cursor = None
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        results = cursor.fetchall()
        
        return jsonify(results)
    except Error as e:
        filename = r"C:\Users\Nechama Haschel\Documents\courses.txt.json"
        try:
            with open(filename,'r') as file:
                return json.load(file)
        except: 
            return jsonify({"message":"Error retrieving groups", 'error':str(e)}), 500
    
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            try:
                connection.close()
            except Error as e:
                return

@app.route('/test_db_connection', methods=['GET'])
def test_db_connection():
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            cursor.execute("SELECT 1")
            result = cursor.fetchone()
            cursor.close()
            connection.close()
            if result:
                return jsonify({'message': 'Database connection successful!'}), 200
            else:
                return jsonify({'message': 'Failed to execute query.'}), 500
        except Error as e:
            return jsonify({'message': 'Error executing query.', 'error': str(e)}), 500
    else:
        return jsonify({'message': 'Database connection failed.'}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    _email = data.get("email")
    _password = data.get("password")
    try:
        query = f"select user_id, firstname, lastname from users where upper(email)=upper('{_email}') and upper(password)=upper('{_password}') limit 1" 
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute(query)
        results = cursor.fetchone()
        
        if results:
            user_id = results[0]
            access_token = create_access_token(identity=user_id)
            response = make_response(jsonify({'access_token':access_token}))
            return results[1]+" "+results[2]
        else:
            return jsonify({"message":"invalid credentials"}), 401
    except Error as e:
            return jsonify({"message:":"error during login", "error": str(e)}),500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)