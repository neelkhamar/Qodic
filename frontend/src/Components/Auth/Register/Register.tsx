import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APIHandler } from "../../../Utils/APIHandler";
import useValidator from "../../../Utils/useValidator";
import { Context } from "../../../Utils/Context";
import TextField from "../../Common/TextField/TextField";
import AlertMessage from "../../Common/AlertMessage/AlertMessage";
import PrimaryButton from "../../Common/Button/Button";

const Register = () => {
  const navigate = useNavigate();
  const { showMessage } = useContext(Context);

  const initialValues = {
    fullname: undefined,
    username: undefined,
    password: undefined,
  };
  const [validator, showValidationMessage]: any = useValidator();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors]: any = useState(null);
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors(null);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (validator.allValid()) {
      setErrors(null);
      try {
        setLoading(true);
        let res: any = await APIHandler("Post", "/auth/register", formData);
        if (res.status === 201) {
          showMessage("success", "Signup Successful");
          navigate("/auth/login");
          resetForm();
        }
      } catch (e: any) {
        if (e?.data?.error) {
          setErrors(e?.data?.error);
        }
      } finally {
        setLoading(false);
      }
    } else {
      showValidationMessage(true);
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      // forceUpdate();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Register
        </h2>
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Fullname<span className="text-red-500">*</span>
            </label>
            <TextField
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Fullname"
              required={true}
              onChange={(e: any) => handleChange("fullname", e.target.value)}
              aria="fullnameHelp"
              value={formData?.fullname}
            />
            <small id="fullnameHelp" className="text-red-500">
              {validator.message("fullname", formData?.fullname, "required")}
            </small>
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Username<span className="text-red-500">*</span>
            </label>
            <TextField
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required={true}
              onChange={(e: any) => handleChange("username", e.target.value)}
              aria="usernameHelp"
              value={formData?.username}
            />
            <small id="usernameHelp" className="text-red-500">
              {validator.message("username", formData?.username, "required")}
            </small>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password<span className="text-red-500">*</span>
            </label>
            <TextField
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required={true}
              onChange={(e: any) => handleChange("password", e.target.value)}
              aria="passwordHelp"
              value={formData?.password}
            />
            <small id="passwordHelp" className="text-red-500">
              {validator.message("password", formData?.password, "required")}
            </small>
          </div>
          {errors && <AlertMessage message={errors} />}
          <PrimaryButton type="submit" label="Sign up" loading={loading} />
        </form>
        <div className="my-2 text-center">
          Already have an account?{" "}
          <Link className="text-blue-400" to={"/auth/login"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
