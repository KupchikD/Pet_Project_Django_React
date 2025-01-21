import './App.css';
import Register from './Register';
import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

class App extends React.Component{
    state = { details: [], }

    componentDidMount(){
        let data;
        axios.get('http://localhost:8000')
        .then(res => {
            data = res.data;
            this.setState({
                details: data
                });
            })
            .catch(err => {
                console.log(err);
            })
        }
        render(){
            const Home = () => (
                <div>
                    <header>Data from Django</header>
                    <hr></hr>
                    {this.state.details.map((output, id) => (
                        <div key={id}>
                            <div>
                               <h2>{output.title}</h2>
                               <p>{output.cost}</p>
                            </div>
                        </div>
                    ))}
                </div>
            );

        return(
            <Router>
{/*                 <nav> */}
{/*                     <ul> */}
{/*                         <li><Link to='/'>Home</Link></li> */}
{/*                         <li><Link to='/register'>Register</Link></li> */}
{/*                     </ul> */}
{/*                 </nav> */}

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        );
    }
}

export default App;