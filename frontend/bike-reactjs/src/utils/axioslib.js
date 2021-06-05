import axios from 'axios';

function axiosRequest(options) {
    return new Promise((resolve, reject) => {
        axios(options).then((axiosRes) => {
            if(axiosRes.status == 200) {
                //console.log('returning response');
                //console.log(axiosRes.data)
                resolve(axiosRes.data)
            }else {
                reject(axiosRes.status)
            }

        }).catch((err) => {
            reject(err);
        })
    })

}

export default axiosRequest;