import { React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const About = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container"> 
      <section className="mb-5">
        <h2>What is iNotebook?</h2>
        <p className="fs-5">
          iNotebook is a modern, secure, and user-friendly note-taking application designed to help you organize your thoughts, ideas, and important information efficiently. Here are some key features:
        </p>
        <ul className="fs-5">
          <li>A <strong>simple</strong> and <strong>intuitive</strong> interface for seamless note-taking</li>
          <li>Built using the powerful <strong>MERN</strong> stack (MongoDB, Express.js, React, Node.js) and styled with <strong>Bootstrap</strong></li>
          <li>Full <strong>CRUD</strong> (Create, Read, Update, Delete) functionality for managing your notes</li>
          <li>Robust user authentication implemented with <strong>JSON Web Tokens (JWT)</strong></li>
          <li>Enhanced security through password hashing with <strong>Salt</strong> before storage in MongoDB</li>
          <li>Responsive design for a great experience on both desktop and mobile devices</li>
        </ul>
      </section>

      <section className="mb-5">
        <h2>Learning Outcomes</h2>
        <ul className="fs-5">
          <li>Deepened understanding of <strong>React.js</strong> concepts including states, hooks, props, and component lifecycle</li>
          <li>Gained practical experience with <strong>React Router</strong> for seamless navigation in single-page applications</li>
          <li>Implemented user authentication and authorization using <strong>JWT</strong>, enhancing application security</li>
          <li>Learned about password hashing and salting techniques to protect user data</li>
          <li>Improved skills in full-stack development, connecting frontend React with a Node.js/Express backend</li>
          <li>Practiced working with <strong>MongoDB</strong>, a popular NoSQL database, for efficient data storage and retrieval</li>
        </ul>
      </section>

      <section>
        <h2>Reflections</h2>
        <p className="fs-5">
          Building iNotebook has been an eye-opening journey into the complexities of modern web development. What initially seemed like a straightforward project quickly revealed layers of complexity, mirroring the challenges faced in professional software development. This experience has given me a newfound appreciation for the intricate work that goes into creating robust, secure, and user-friendly web applications. &#128512;
        </p>
        <p className="fs-5">
          One of the most significant takeaways has been gaining hands-on experience with authentication and security features. Implementing JWT tokens and understanding the importance of secure password storage have been crucial learning points, bridging the gap between frontend and backend development in my skill set.
        </p>
        <p className="fs-5">
          As I continue to refine and expand iNotebook, I'm excited to explore more advanced features and optimizations, further deepening my understanding of full-stack development.
        </p>
      </section>
    </div>
  )
}

export default About;
