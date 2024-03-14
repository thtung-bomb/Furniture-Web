import axios from "axios";
import Cookies from "js-cookie";


export async function getRequestOfCustomer(pageNumber, pageSize, status) {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/request/auth/status/${status}?page=${pageNumber}&pageSize=${pageSize}`, {
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        });

        // Nếu status là 200, trả về dữ liệu
        if (response.status === 200) {
            return response.data;
        } else {
            // Nếu status không phải là 200, xử lý lỗi hoặc trả về một giá trị phù hợp
            console.error('Error fetching requests. Status:', response.status);
            return null; // hoặc trả về một giá trị khác phù hợp
        }
    } catch (error) {
        // console.error('Error fetching requests:', error);
        throw error;
    }
}

export function getRequestById(requestId) {

    try {
        axios.get(`http://localhost:8080/api/v1/request/auth/${requestId}`, {
            headers: {
                'Authorization': 'Bearer' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log(error);
    }

}

export async function confirmProposal(proposalID) {
    try {
        const response = await axios.patch(`http://localhost:8080/api/v1/request/auth/confirmProposal/${proposalID}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error; // Rethrow error to handle it in the caller
    }
}

export function unlockRequest(requestId) {

    try {
        axios.delete(`http://localhost:8080/api/v1/request/auth/${requestId}/lock`, {
            headers: {
                'Authorization': 'Bearer' + Cookies.get('token'),
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log(error);
    }

}
