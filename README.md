
<p align="center">
  <img src="https://i.ibb.co/rsP200t/stella.png" alt="Stella Icon" width="250" height="250">
</p>

# Stella - Multilingual Chat Application

Welcome to Stella, your chat platform that makes communication in different languages easy and efficient. Stella allows text messages and video calls, providing an integrated and user-friendly chat experience.

## Key Features

- **Text Messages and Video Calls:** Communicate through text messages or dive into a more personal experience with video calls.

- **Dark Mode:** For a comfortable user experience in low-light environments, Stella offers an elegant dark mode.

### Technologies Used

#### Client (Next.js, Tailwind CSS, ShadCN, React Hook Form, Zod, WebSocket, P2P)

- **Next.js 14:** A React application framework that enables server-side rendering and provides an amazing development experience.

- **Tailwind CSS:** A highly customizable, low-level CSS build tool.

- **ShadCN (Component Library):** A library of reusable components that streamlines the development of consistent and appealing interfaces.

- **React Hook Form:** A library for managing forms in React with ease.

- **Zod:** A schema validation library for JavaScript.

- **WebSocket (socket.io):** For real-time communication, providing a smooth and responsive chat experience.

- **P2P (PeerJS):** Enabling peer-to-peer video calls for a more private and efficient experience.

#### Server (NestJS, Mongoose, Peer, Socket.io)

- **NestJS:** A progressive Node.js framework for building efficient and scalable server-side applications.

- **Mongoose:** An object modeling library for MongoDB for Node.js.

- **Peer:** A library that facilitates P2P connections.

- **Socket.io:** A library that enables bidirectional real-time communication.

## Getting Started

Follow the steps below to set up Stella on your local environment:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/angelopedroso/stella.git
   cd stella
   ```

2. **Install Dependencies:**

   ```bash
   cd client
   yarn
   cd ../server
   yarn
   cd ../peer-server
   yarn
   ```

3. **Configure Environment:**
   - For the client, create a `.env.local` file in the `client` directory, and base it on `.env.example` with necessary configurations.
   - For the server, create a `.env` file in the `server` directory, and base it on `.env.example` with the required settings.
   - For the peer-server, create a `.env` file in the `peer-server` directory, and base it on `.env.example` with the required settings.

4. **Start the Applications:**
   - Start the client:

     ```bash
     cd client
     yarn dev
     ```

   - Start the server:

     ```bash
     cd ../server
     yarn start:dev
     ```
     
   - Start the peer-server:

     ```bash
     cd ../peer-server
     yarn start:dev
     ```

5. **Access Stella:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access Stella.

### Future Plans

- **Internationalization (i18n) for Other Languages:** Make Stella accessible to users worldwide by implementing support for multiple languages.

---

## Contribution

If you want to contribute to Stella, follow these steps:

1. Fork this repository.
2. Create a branch for your contribution: `git checkout -b your-branch`.
3. Make the desired changes and add documentation if necessary.
4. Commit your changes: `git commit -m "Your message"`.
5. Push your changes: `git push origin your-branch`.
6. Open a pull request in this repository.

---

### License

This project is licensed under the terms of the MIT License - see the [LICENSE](./LICENSE) file for details.
