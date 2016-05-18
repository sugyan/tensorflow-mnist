import os
import tensorflow as tf

from tensorflow.examples.tutorials.mnist import input_data
data = input_data.read_data_sets("/tmp/data/", one_hot=True)

# model
import model
with tf.variable_scope("simple"):
    x = tf.placeholder("float", [None, 784])
    y, variables = model.simple(x)

# train
y_ = tf.placeholder("float", [None, 10])
cross_entropy = -tf.reduce_sum(y_ * tf.log(y))
train_step = tf.train.GradientDescentOptimizer(0.01).minimize(cross_entropy)
correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(y_,1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, "float"))

saver = tf.train.Saver(variables)
init = tf.initialize_all_variables()
with tf.Session() as sess:
    sess.run(init)
    for i in range(1000):
        batch_xs, batch_ys = data.train.next_batch(100)
        sess.run(train_step, feed_dict={x: batch_xs, y_: batch_ys})

    print(sess.run(accuracy, feed_dict={x: data.test.images, y_: data.test.labels}))

    path = saver.save(sess, os.path.join(os.path.dirname(__file__), "data/simple.ckpt"))
    print("Saved:", path)
