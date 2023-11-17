## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/vahid-bagheri/nuxt2-nodemailer-email-service.git
```

2. Install dependencies:

```bash
cd nuxt2-nodemailer-email-service
yarn install
```

3. Create a `.env` file in the root directory and add your SMTP server details:

```bash
SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-password
```

4. Start the development server:

```bash
yarn dev
```

5. Access the application at `http://localhost:3000`.

## Usage

To use the email sending service, navigate to the `/` route. You will be presented with a form to fill out the email details:

![Email Form](https://github.com/vahid-bagheri/nuxt2-nodemailer-email-service/blob/main/static/readme-form.png?raw=true)

Fill out the required fields and click the "Send Email" button. The email will be sent using Nodemailer.

## Contributing

If you want to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b my-feature-branch
```

3. Make your changes and commit them:

```bash
git add .
git commit -m "Add my feature"
```

4. Push your branch to your fork:

```bash
git push -u origin my-feature-branch
```

5. Create a pull request on the original repository.

Thank you for your interest in contributing to this project!
