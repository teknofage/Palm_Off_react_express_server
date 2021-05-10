const User = require('../models/user');
const Search = require('../models/searches');
// const Comment = require('../models/comment');


module.exports = (app) => {

    // NEW POST
    app.get('/searches/new', (req, res) => {
        var currentUser = req.user;
        return res.render("searches-new", { currentUser });
    });


    // CREATE
    app.post("/searches/new", (req, res) => {
        if (req.user) {
            var post = new Post(req.body);
            post.author = req.user._id;
            post.upVotes = [];
            post.downVotes = [];
            post.voteScore = 0; 

            post
                .save()
                .then(post => {
                    return User.findById(req.user._id);
                })
                .then(user => {
                    user.searches.unshift(post);
                    user.save();
                    // REDIRECT TO THE NEW POST
                    res.redirect(`/searches/${post._id}`);
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });
    
  
    // SHOW
    app.get("/searches/:id", function (req, res) {
        var currentUser = req.user;
        Post.findById(req.params.id).populate('comments').lean()
            .then(post => {
                res.render("searches-show", { post, currentUser });  
            })
            .catch(err => {
                console.log(err.message);
            });
    });

// INDEX
    app.get('/', (req, res) => {
        var currentUser = req.user;
        Post.find({}).lean().populate('author')
        .then(searches => {
            res.render('searches-index', { searches, currentUser });
            console.log(searches)
        }).catch(err => {
            console.log(err.message);
        })
    })

    // // SUBREDDIT
    // app.get("/n/:subreddit", function (req, res) {
    //     var currentUser = req.user;
    //     Post.find({ subreddit: req.params.subreddit }).lean()
    //         .then(searches => {
    //             res.render("searches-index", { searches, currentUser });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // });

    // FETCH USER
    app.get("/users/:username", (req, res) => {
        const currentUser = req.user;
        User.findOne({username:req.params.username}).populate("searches")
        .then(user => {
            const searches = user.searches;
            return res.render("searches-index", { searches })
        })
        .catch(err => {
            console.log(err);
        });
    
    })

//     // UP VOTE searches
//     app.put("/searches/:id/vote-up", function(req, res) {
//         Post.findById(req.params.id).exec(function(err, post) {
//           post.upVotes.push(req.user._id);
//           post.voteScore = post.voteScore + 1;
//           post.save();
      
//           res.status(200);
//         });
//       });
      
//     //   DOWN VOTE searches
//       app.put("/searches/:id/vote-down", function(req, res) {
//         Post.findById(req.params.id).exec(function(err, post) {
//           post.downVotes.push(req.user._id);
//           post.voteScore = post.voteScore - 1;
//           post.save();
      
//           res.status(200);
//         });
//       });
// };