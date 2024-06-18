import React, { FC } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios, { AxiosHeaders } from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Cookies from "js-cookie";
import { AuthContext } from "../Security/AuthContext";
import { decodeJwt as JWT } from "jose";

type SomeComponentProps = RouteComponentProps;
const SignUp: FC<SomeComponentProps> = ({ history }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const authContext = React.useContext(AuthContext);

  if (!authContext) throw new Error("AuthContext not found");

  const { setAuth } = authContext;

  const submitData = async (data: any) => {
    let params = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      userName: data.userName,
      profilePic: data.profilePic,
    };

    if (data.password === data.cpassword) {
      console.log("matching passwords");
    }

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8008/signup",
        data: params,
        headers: { "Content-Type": "application/json" },
      });

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: 0,
        toastId: "my_toast",
      });
      const header = response.headers;
      let token;

      if (header instanceof AxiosHeaders) {
        token = header.get("Authorization") as string;
      }

      if (token) {
        Cookies.set("auth", token, { expires: new Date(2147483647000) });
        localStorage.setItem(params.email, params.email);
        let claims = JWT("claim= " + token);
        let userId: any;
        claims && "userId" in claims
          ? (userId = claims.userId)
          : console.log("UserID not found");
        localStorage.setItem("userId", userId);
        setAuth(true);
        reset();
        setTimeout(() => {
          history.push("/feed");
        }, 1000);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        toast.error("Account with email/username already exists.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
      }
    }
  };
  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="card mb-3 mt-3 rounded" style={{ maxWidth: "500px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3 mb-3">
                  Sign Up Form
                </h3>
                <form
                  className="row"
                  autoComplete="off"
                  onSubmit={handleSubmit(submitData)}
                >
                  <div className="col-md-6">
                    <div className="">
                      <label className="form-label">Firstname</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput1"
                        {...register("firstName", {
                          required: "Firstname is required!",
                        })}
                      />
                      {errors.firstName && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {errors.firstName.message?.toString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="">
                      <label className="form-label">Lastname</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput2"
                        {...register("lastName", {
                          required: "Lastname is required!",
                        })}
                      />
                      {errors.lastName && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {errors.lastName.message?.toString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput3"
                      {...register("email", { required: "Email is required!" })}
                    />
                    {errors.email && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.email.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label className="form-label">Username</label>
                    <input
                      type="userName"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput3"
                      {...register("userName", {
                        required: "Username is required!",
                      })}
                    />
                    {errors.userName && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.userName.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput5"
                      {...register("password", {
                        required: "Password is required!",
                      })}
                    />
                    {errors.password && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.password.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput6"
                      {...register("cpassword", {
                        required: "Confirm Password is required",

                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords don't match.",
                      })}
                    />
                    {errors.cpassword && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.cpassword.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">
                      Paste your profile image link
                    </label>
                    <input
                      type="profilePic"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput7"
                      {...register("profilePic", {
                        required: "Profile image is required",
                      })}
                    />
                  </div>
                  <div className="text-center mt-4 ">
                    <button
                      className="btn btn-outline-primary text-center shadow-none mb-3"
                      type="submit"
                    >
                      Submit
                    </button>
                    <p className="card-text">
                      Already have an account?{" "}
                      <Link style={{ textDecoration: "none" }} to={"/login"}>
                        Log In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </>
  );
};

export default SignUp;
