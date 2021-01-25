// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CardContent from "./components/CardContent";
// const ref = useRef();

/** 
INSTRUCTIONS 

Fork this codepen.

Use this API
https://jsonplaceholder.typicode.com/
to fetch posts.

Display all the posts titles on the screen however you like.

Clicking on a post should open up a modal, the modal should display
- the post author's name
- the post author's catchPhrase
- the post title
- the post body
- a close button

The modal's close button should close the modal. 
Clicking outside of the modal should also close the modal. 
How you style the modal is up to you. 

HINTS: 
- Keep different screen sizes in mind 
- Leave comments 
- read the API docs -> https://jsonplaceholder.typicode.com/guide/
- keep the styling simple (or go wild)

Good luck!
*/

// You don't necessarily need to use React
// but it might help.
// const App = () => (
//   <div className="box">
//     <h1>PridePlaces Coding Challenge</h1>
//     Read the instructions in the JS comments
//   </div>
// );

// ReactDOM.render(<App />, document.getElementById("root"));

// Trinh's comments:
// These are the steps I've taken:
// 1. Implement useEffect to fetch the posts and users from the given API at page load, and store them in 2 pieces of object variable state called posts and author.
// 2. The app returns a list of posts (in the posts.map() function). Each post includes the 4 points of information as requested by this assignment.
// To separate concern, I've created a component called CardContent to define the structure and behaviors of each post
// In the posts.map() function, the information from the posts and authors variable will be passed to each post.
// CardContent component:
//  - The post title is always on display. Clicking on the title toggles will change the value of state variable "isExpanded", which will open/close the content.
//  - The Close button at the end of the post content will close the content. Clicking on the Close button  state variable "isExpanded" to false, which will close the content.
//  - To have the content close when clicking outside the post, I've used useRef with a hook called useOnClickOutside to control the state variable "allowExpand". The content of the post will only display when "isExpanded" and "allowExpand" are both true.
// - I had some styling in App.css, and also used Bootstrap for reponsive styling
function App() {
  const [posts, setPosts] = useState(null);
  const [authors, setAuthors] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        // console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get("https://jsonplaceholder.typicode.com/users/")
      .then((res) => {
        // console.log(res.data);
        setAuthors(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (posts === null || authors === null) {
    return "Loading...";
  }
  return (
    <div className="App mx-2">
      <h3 className="text-center mb-4">PridePlaces Coding Challenge</h3>
      <div className="postWrapper">
        {posts.map((post) => {
          return (
            <div
              className="post col-lg-10 col-md-8 col-sm-12 bg-info text-white shadow mb-2 p-3 rounded"
              key={post.id}
            >
              <CardContent
                authorName={authors[post.userId - 1].name}
                authorCatchPhrase={authors[post.userId - 1].company.catchPhrase}
                postTitle={post.title}
                postBody={post.body}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
