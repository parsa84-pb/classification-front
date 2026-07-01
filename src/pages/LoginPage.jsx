import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL || "";

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/api/auth/login/`, values);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("username", values.username);
      message.success("Welcome back!");
      navigate("/");
    } catch (error) {
      message.error("Invalid username or password");
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
        title="Sign In to AI Classifier"
        style={{ width: 400, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
      >
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
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
              Login
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          Don't have an account? <Link to="/register">Register now</Link>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
