import { UserModel } from "../models/Auth";

const LoginPresenter = {
    async login(username, password, navigate) {
        

        try {

            const data = await UserModel.login(
                username,
                password
            );

            const { message, role } = data;
            console.log(role)

            switch (role.toLowerCase()) {

                case "admin":
                    // navigate("/admin-dashboard");
                    break;

                case "teacher":
                    navigate("/teacher-dashboard");
                    break;

                case "student":
                    navigate("/student-dashboard");
                    break;

                default:
                    console.log("Unknown role");
            }

            console.log(message);

            return {
                success: true,
                message
            };

        } catch (error) {

            if (error.response) {

                return {
                    success: false,
                    message: error.response.data.message
                };

            }

            return {
                success: false,
                message: "Unable to connect to server."
            };
        }
    }

};

export default LoginPresenter;