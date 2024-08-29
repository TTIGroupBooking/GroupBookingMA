
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
    "default": "I'm not sure how to respond to that. Can you please rephrase or ask about our courses?",
"app":"Our app allows users to create and list courses they’re offering and enables participants to browse, book, and attend these classes. It’s a platform to connect instructors with learners.",
"create":"You can create an account by clicking the 'Sign Up' button on our homepage and following the prompts to enter your information. You can sign up with an email address or use a social media account.",
"fee":"Creating an account and browsing courses are free. However, there may be fees associated with booking classes or listing courses, depending on the course and payment plan.",
"reset":"Click on the 'Forgot Password' link on the login page. Follow the instructions to reset your password via the email you registered with.",
"mobile":"Yes, our app is available on both iOS and Android devices. You can download it from the App Store or Google Play Store.",
"price":"When creating or editing your course, you’ll find an option to set the price in the course settings. Enter your desired amount and save your changes.",
"course details":"Yes, you can edit your course details anytime by going to the 'Instructor Dashboard' and selecting the course you wish to modify.",
"course participants":"You can view your participants in the 'Instructor Dashboard' under the 'Manage Courses' section. There you’ll find a list of attendees for each course.",
"cancel":"To cancel a course, go to the 'Instructor Dashboard,' select the course you want to cancel, and choose the 'Cancel Course' option. Participants will be notified, and refunds will be processed if applicable.",
"book":"Browse available courses, select the one you’re interested in, and click on the 'Book Now' button. Follow the prompts to complete your booking and payment.",
"cancel my booking":"Yes, you can cancel your booking by going to 'My Bookings' in your account. Cancellation policies vary by course, so please review the specific course’s cancellation terms.",
"course materials":"Course materials are typically available in the 'My Courses' section of your account. You’ll find resources, recordings, and other materials provided by the instructor.",
"feedback":"Yes, after completing a course, you’ll have the opportunity to leave feedback and a rating. This helps other users make informed decisions and helps instructors improve their courses.",
"trouble with booking":"If you’re having trouble, please check your internet connection and ensure you’re using the latest version of the app. If the problem persists, contact our support team for assistance.",
"payment methods":"We accept major credit and debit cards, as well as payment methods like PayPal. Check the payment options available at checkout.",
"refund":"Refund requests can be made through the 'My Bookings' section. Select the booking you wish to cancel and follow the instructions to request a refund.",
"process a refund":"Refunds are typically processed within 5-7 business days. The exact time may vary depending on your payment method and bank.",
"charged if don't attend class":"If you don’t attend a class, you may still be charged, depending on the course’s cancellation policy. Please review the course details for specific terms.",
"discount":"Discounts for multiple bookings are not standard but may be offered by individual instructors. Check the course description or contact the instructor for any available discounts.",
"app isn’t working":"Try restarting the app or your device. Ensure you have the latest version of the app installed. If the problem persists, contact our support team for help.",
"trouble with my payment.":"Check that your payment information is correct and try again. If the issue continues, contact your bank or payment provider. You can also reach out to our support team for assistance.",
"can’t find":"Ensure you’re logged into the correct account and check the 'My Courses' section. If you still can’t find it, contact our support team for help.",
"account locked":"Your account may be locked due to multiple failed login attempts or suspicious activity. Follow the instructions sent to your email to unlock your account, or contact our support team for assistance.",
"update information":"You can update your personal information by going to your account settings and editing your details. Save the changes to update your profile.",
"information safe":"Yes, we prioritize your privacy and use secure encryption methods to protect your personal information. For more details, please review our Privacy Policy.",
"change email":"To change your email address, go to your account settings and update your email details. You may need to verify the new email address.",
"other users information":"Other users can only see the information you choose to share publicly, such as your instructor profile or course listings. Your personal contact details are kept private.",
"data breaches":"In the event of a data breach, we promptly notify affected users and take necessary actions to secure data and prevent further issues. We also investigate the breach to enhance our security measures.",
"unauthorized activity":"Immediately contact our support team and provide details of the suspicious activity. We will investigate and take steps to secure your account.",
"specific category":"Use the search feature or browse through categories on the homepage. You can filter courses by type, location, or other criteria to find what you’re looking for.",
"course from location":"",
"course doesn’t meet":"If a course doesn’t meet your expectations, provide feedback to the instructor and contact our support team if you need assistance with refunds or other issues.",
"multiple languages":"Course availability in multiple languages depends on the instructors. Check the course description for language options or contact the instructor directly.",
"new courses added":"New courses are added regularly. Check the 'New Courses' section or sign up for our newsletter to stay updated on the latest offerings.",
"promote course":"You can promote your course by sharing it on social media, using our promotional tools, and engaging with potential students through the app.",
"tools for instructors":"Instructors have access to tools for course creation, participant management, scheduling, and communication with students through the 'Instructor Dashboard.'",
"free trial":"Yes, you can offer a free trial or sample by setting up a free session or providing sample materials. Set this up when creating or editing your course.",
"disputes":"Address disputes directly with participants through the app’s messaging system. If you need further assistance, contact our support team for mediation.",
"collaborate":"Yes, you can collaborate with other instructors by co-creating courses or offering joint sessions. Coordinate with your collaborators to set up the details.",
"feedback about the app":"You can provide feedback by sending us an email!"
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
def checkCookies():
    try:
        filename = r"C:\TTI\Mr. Harp\data.txt"
        with open(filename,"r") as file:
            content = file.read()
            content = content.split(',')
            print(content)
            return content
    except:
        return 0
               
@app.route('/bookClass', methods=['POST'])
def book_class():
    data = request.get_json()
    groupID = data.get('groupID')
    userID = int(data.get('userID'))

    if not isinstance(groupID, int) or not isinstance(userID, int):
        return jsonify({"message": "Invalid input"}), 400

    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor()
        statement = "INSERT INTO userbooked (user_id, group_id) VALUES (%s, %s)"
        cursor.execute(statement, (userID, groupID))
        connection.commit()
        return jsonify({"message": "Booked successfully"}), 200
    except Error as e:
        return jsonify({"message": "Error updating booking", "error": str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
    
        
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
        response = make_response("Multiple cookies are set")
        if results:
            with open(r"C:\TTI\Mr. Harp\data.txt","w") as file:
                file.write(str(results[0])+","+results[1]+" "+results[2])
#                file.write(f"['{str(results[0])}','{results[1]} {results[2]}']")
                #file.write("{userID:'"+str(results[0])+"', Name: '"+results[1]+" "+results[2]+"'}")
            return "1"
        else:
            return "0"
            return jsonify({"message":"invalid credentials"}), 401
    except Error as e:
            return "0"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)