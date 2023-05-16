import Header from "./core/Header";
import {Routes , Route } from "react-router-dom" 
import PostList from "./posts/PostList";
import PostDetail from "./posts/PostDetails";

function App() {
  return <div>
    <Header/>
    <Routes> 
            <Route path="/" element={<PostList/> } /> 
            <Route path="/detail/:id" element={<PostDetail/> } /> 
       </Routes> 
  </div>;
}

export default App;
