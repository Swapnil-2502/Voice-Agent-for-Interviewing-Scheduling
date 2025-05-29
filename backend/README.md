## Creating MySQL database and tables

- Create database and use
    ```bash
        CREATE DATABASE <Database_NAME>;
        USE <Database_NAME>;
    ```
- Create Jobs table
    ```bash
        CREATE TABLE IF NOT EXISTS Jobs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255),
            description TEXT,
            requirements TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    ```

- Create Candidates table
    ```bash
        CREATE TABLE IF NOT EXISTS candidates (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            phone VARCHAR(20),
            current_ctc INT,
            expected_ctc INT,
            notice_period VARCHAR(50),
            experience VARCHAR(50)
        );
    ```

- Create Appointments table
    ```bash
        CREATE TABLE IF NOT EXISTS appointments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            job_id INT,
            candidate_id INT,
            date_time DATETIME,
            status VARCHAR(50) DEFAULT 'Scheduled',
            FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
            FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
        );
    ```

- Create Conversations table
    ```bash
        CREATE TABLE IF NOT EXISTS conversations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            candidate_id INT,
            transcript TEXT,
            entities_extracted JSON,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
        );
    ```