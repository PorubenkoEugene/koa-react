import axios from 'axios'

export async function verifyLogin({ email, password }) {
  try {
    const response = await axios.post('http://localhost:8080/api/login',{email,password});
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     if (username === 'Matt' && password === 'password') {
  //       resolve();
  //     } else {
  //       reject();
  //     }
  //   }, 1000);
  // });
}
