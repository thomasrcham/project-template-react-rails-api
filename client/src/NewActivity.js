import { useState } from "react";
import { Form } from 'semantic-ui-react'

function NewActivity({handleNewActivity}) {
    const [formData, setFormData] = useState({
      organization: "",
      activity_name: "",
      activity_description: "",
      image: ""
    });

    function handleChange(event) {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      })
    }

    function handleSubmit(e) {
      e.preventDefault();

      const newActivity = {
        organization: formData.organization,
        activity_name: formData.activity_name,
        activity_description: formData.activity_description,
        image: formData.image
      }

      fetch("/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newActivity),
      })
        .then((response) => response.json())
        .then(data => {
          handleNewActivity(data)
          setFormData({
            organization: "",
            activity_name: "",
            activity_description: "",
            image: ""
          })
        })
    }
    // }

    return (
      <div>
        <strong className="form-title">Add a New Activity</strong>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid label="Organization"
              placeholder="Organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
            />
            <Form.Input
              fluid label="Activity Name"
              placeholder="Activity Name"
              name="activity_name"
              value={formData.activity_name}
              onChange={handleChange}
            />
            <Form.Input
              fluid label="Activity Description"
              placeholder="Activity Description"
              name="activity_description"
              value={formData.activity_description}
              onChange={handleChange}
            />
            <Form.Input
              fluid label="Image URL"
              placeholder="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }

  export default NewActivity;