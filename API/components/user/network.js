import { success as _success } from "../../../network/response.js";
import { Router } from 'express'; 
import  getConnection from '../../../model/db.js';


const router = Router();

router.get('/list', async function (req, res) {
    const client = await getConnection();
    
    const query_request = {
        text: `SELECT * FROM tbl_usersdb order by id`
        }
        client.query(query_request, (err, result) =>{
        res.send(result.rows);
    })
});

router.post('/login', function (req, res) {
    console.log(req.query);

    res.send({
        username: req.query.username,
        token: 'token',
        id_user: 'id_user',
        success: 'ok',
        metodo: 'login'
    });
});

router.post('/register', async function (req, res) {
    // Realiza la conexion a db
    const client = await getConnection();

    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let phone_number = req.query.phone_number;

    const query_request = {
        text: 'INSERT INTO tbl_usersdb(username, email, password, phone_number) VALUES ($1, $2, $3, $4)',
        values: [username, email, password, phone_number]
    }

    client.query(query_request)
        .then(r => { _success(req, res, r, 200) })
        .catch(e => { _success(req, res, e.detail, 200) });
});


router.delete('/delete', async function (req, res){
    const client = await getConnection();
    
    const idUser = req.query.id;

    const query_request = {
        text: `DELETE FROM tbl_usersdb WHERE id = $1`,
        values: [idUser]
    }

    client.query(query_request)
        .then(r => { _success(req, res, r, 200) })
        .catch(e => { _success(req, res, e.detail, 200) });

});

router.put('/update', async function(req, res){
    const client = await getConnection();

    let idUser = req.query.id;
    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let phone_number = req.query.phone_number;

    const query_request={
        text:`UPDATE tbl_usersdb SET username =$2, email= $3, password =$4, phone_number = $5 WHERE id= $1`,
        values: [idUser, username,email,password,phone_number]
    }

    client.query(query_request)
        .then(r => { _success(req, res, r, 200) })
        .catch(e => { _success(req, res, e.detail, 200) });

});



export default router;