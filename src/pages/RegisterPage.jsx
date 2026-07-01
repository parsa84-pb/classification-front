import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL || "";

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/api/auth/register/`, values);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("username", response.data.username);
      message.success("Registration successful!");
      navigate("/");
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Registration failed";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <Card
        title="Create an Account"
        style={{ width: 400, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      >
        <Form name="register" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Email (Optional)" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </Card>
    </div>
  );
}

export default RegisterPage;
