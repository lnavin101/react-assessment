import {Routes , Route } from "react-router-dom" 
import Post from "./posts/Post";
import PostDetail from "./posts/PostDetails";

function App() {
  return <div>
    <Routes> 
            <Route path="/" element={<Post/> } /> 
            <Route path="/detail/:id" element={<PostDetail/> } /> 
       </Routes> 
  </div>;
}

export default App;
