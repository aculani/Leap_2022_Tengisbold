import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CategoryCreate({ afterSubmit }) {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const submit = () => {
    let statusCode;
    fetch('https://demo-api-one.vercel.app/api/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({ name, description }),
    })
      .then((res) => {
        statusCode = res.status;
        return res.json();
      })
      .then((data) => {
        if (statusCode === 200) {
          toast.success('amjilttai nemegdlee');
          afterSubmit(data.body);
        } else {
          if (statusCode === 403 || statusCode === 401) {
            navigate('/signout');
          }
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('aldaa garlaa');
      });
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <Form.Group className="mb-3" controlId="form.name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name of the category..." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="form.description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          as="textarea"
          rows={3}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
