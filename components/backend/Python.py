from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# MySQL Database connection
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='GroupBooking',
            user='user',
            password='henry27'
        )
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None

@app.route('/add-group', methods=['POST'])
def add_group():
    data = request.get_json()  # Get JSON data from the request

    connection = get_db_connection()
    if connection is None:
        return jsonify({"message": "Database connection failed"}), 500

    cursor = connection.cursor()
    query = """
    INSERT INTO courses (name, startDate, weeks, timesPerWeek, maxParticipants, minParticipants, description, preferredDay, preferredTime, status)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    values = (
        data['name'],
        data['startDate'],
        data['weeks'],
        data['timesPerWeek'],
        data['maxParticipants'],
        data['minParticipants'],
        data['description'],
        data['preferredDay'],
        data['preferredTime'],
        data['status']
    )

    try:
        cursor.execute(query, values)
        connection.commit()
        return jsonify({"message": "Group added successfully"}), 201
    except Error as e:
        print(f"Error: {e}")
        return jsonify({"message": "Failed to add group"}), 500
    finally:
        cursor.close()
        connection.close()
        
@app.route('/add-group', methods=['GET'])
def get_courses():
    connection = get_db_connection()
    

if __name__ == '__main__':
    app.run(debug=True)