from flask import Flask, jsonify, render_template, request
import tensorflow as tf
import numpy as np

app = Flask(__name__)

sess_softmax_1000 = tf.Session()
x = tf.placeholder("float", [1, 784])
W = tf.Variable(tf.zeros([784,10]))
b = tf.Variable(tf.zeros([10]))
y = tf.nn.softmax(tf.matmul(x,W) + b)
saver = tf.train.Saver()
saver.restore(sess_softmax_1000, "tensorflow/data/simple.ckpt")

@app.route('/api/mnist', methods=['POST'])
def mnist():
    input = ((255 - np.array(request.json, dtype=np.uint8)) / 255.0).reshape(1, 784)
    output = sess_softmax_1000.run(y, feed_dict={x: input}).flatten()
    return jsonify(result=output.tolist())

@app.route('/')
def hello():
    return render_template('index.html')
