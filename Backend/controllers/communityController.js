const Community = require("../models/Community");

exports.createPost = async (req, res) => {
  try {
    const { topic, content, tags } = req.body;
    const post = new Community({
      userId: req.user.id,
      topic,
      content,
      tags
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Community.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Only owner can update
    if (post.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    post.topic = req.body.topic || post.topic;
    post.content = req.body.content || post.content;
    post.tags = req.body.tags || post.tags;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Community.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not allowed to delete" });
    }

    await Community.findByIdAndDelete(postId);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Community.find({})
      .sort({ createdAt: -1 })
      .populate("userId", "fullName") 
      .populate("advices.userId", "fullName"); 

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUserPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await Community.find({
      $or: [
        { userId },
        { "advices.userId": userId } 
      ]
    })
      .populate("userId", "name ")
      .populate("advices.userId", "name "); 

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addAnswer = async (req, res) => {
  try {
    const { postId } = req.params;
    const { body } = req.body;

    const post = await Community.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const advice = {
      userId: req.user.id,
      body,
      upvotes: [],
      downvotes: [],
      createdAt: new Date()
    };

    post.advices.push(advice); 
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyAdvices = async (req, res) => {
  try {
    const userId = req.user.id; 
    console.log("Logged-in userId:", userId);

    const communities = await Community.find({
      "advices.userId": userId
    }).lean();



    const myAdvices = [];
    communities.forEach((c) => {
      c.advices.forEach((ad) => {
        console.log("Advice userId:", ad.userId.toString());
        if (ad.userId.toString() === userId.toString()) {
          myAdvices.push({
            topic: c.topic,
            adviceId: ad._id,
            body: ad.body,
            createdAt: ad.createdAt,
          });
        }
      });
    });

    console.log("Filtered advices:", myAdvices.length);
    res.json(myAdvices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
