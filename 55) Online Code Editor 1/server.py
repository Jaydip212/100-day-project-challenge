from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
from io import StringIO
import contextlib
import traceback

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/', methods=['GET'])
def home():
    return "Python Code Execution Server is running!"

@contextlib.contextmanager
def capture_output():
    """Capture stdout and stderr"""
    new_out, new_err = StringIO(), StringIO()
    old_out, old_err = sys.stdout, sys.stderr
    try:
        sys.stdout, sys.stderr = new_out, new_err
        yield sys.stdout, sys.stderr
    finally:
        sys.stdout, sys.stderr = old_out, old_err

@app.route('/execute', methods=['POST'])
def execute_code():
    try:
        if not request.is_json:
            return jsonify({
                'success': False,
                'error': 'Content-Type must be application/json'
            }), 400

        code = request.json.get('code', '')
        if not code:
            return jsonify({
                'success': False,
                'error': 'No code provided'
            }), 400
        
        print(f"Executing code:\n{code}", file=sys.stderr)
        
        # Create a dictionary for local variables
        local_vars = {}
        
        # Capture stdout and stderr
        with capture_output() as (out, err):
            try:
                # Execute the code
                exec(code, {"__builtins__": __builtins__}, local_vars)
                output = out.getvalue()
                error = err.getvalue()
                
                print(f"Execution successful. Output: {output}", file=sys.stderr)
                
                return jsonify({
                    'success': True,
                    'output': output,
                    'error': error
                })
            except Exception as e:
                print(f"Execution failed: {str(e)}", file=sys.stderr)
                return jsonify({
                    'success': False,
                    'error': str(e),
                    'traceback': traceback.format_exc()
                })
    except Exception as e:
        print(f"Server error: {str(e)}", file=sys.stderr)
        return jsonify({
            'success': False,
            'error': f'Server error: {str(e)}'
        })

if __name__ == '__main__':
    print("Starting Python Code Execution Server on port 8000...")
    app.run(port=8000, debug=True) 