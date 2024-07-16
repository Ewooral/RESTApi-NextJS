import { query } from "@/lib/connectToPostgres";
import { UsersInfo } from "@/types/users";



export const createTaskStatuses_POSTGRES = async () => {
    const task_status_query = `
      CREATE TABLE IF NOT EXISTS task_statuses (
        id SERIAL PRIMARY KEY,
        status VARCHAR(50) UNIQUE NOT NULL
      );
  
      INSERT INTO task_statuses(status)
      VALUES ('Pending'), ('In Progress'), ('Completed'), ('Overdue')
      ON CONFLICT (status) DO NOTHING;
    `;
  
    try {
      await query(task_status_query, []);
      console.log("Task statuses created successfully");
    } catch (error) {
      console.error("Error creating task statuses:", error);
      throw error;
    }
  };
  

  export const createTasks_POSTGRES = async () => {

    const tasks_query = `
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status_id INTEGER REFERENCES task_statuses(id) DEFAULT 1,
        due_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
         NEW.updated_at = NOW();
         RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
  
      CREATE TRIGGER update_tasks_updated_at
      BEFORE UPDATE ON tasks
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `;

    
  
    try {
      await query(tasks_query, []);
      console.log("Tasks table created successfully");
    } catch (error) {
      console.error("Error creating tasks table:", error);
      throw error;
    }
  };
  

  export const insertSampleTasks_POSTGRES = async () => {
    const sample_tasks_query = `
      INSERT INTO tasks (user_id, title, description, status_id, due_date)
      VALUES 
        ((SELECT id FROM users WHERE email = 'student@example.com'), 'Complete Homework', 'Finish the math homework by tomorrow', 1, NOW() + INTERVAL '1 day'),
        ((SELECT id FROM users WHERE email = 'admin@example.com'), 'Prepare Report', 'Prepare the annual financial report', 2, NOW() + INTERVAL '7 days'),
        ((SELECT id FROM users WHERE email = 'student@example.com'), 'Group Study', 'Attend the group study session', 1, NOW() + INTERVAL '3 days'),
        ((SELECT id FROM users WHERE email = 'applicant@example.com'), 'Submit Application', 'Submit the application for the new course', 3, NOW() + INTERVAL '2 days')
      ON CONFLICT (title) DO NOTHING;
    `;
  
    try {
      await query(sample_tasks_query, []);
      console.log("Sample tasks inserted successfully");
    } catch (error) {
      console.error("Error inserting sample tasks:", error);
      throw error;
    }
  };
  
  export interface Task {
    id?: string;
    user_id?: string;
    title?: string;
    description: string;
    status_id?: number;
    due_date?: Date;

  }

  export const addTask_POSTGRES = async ({user_id, title, description, status_id, due_date}:Task) => {
    const add_task_query = `
      INSERT INTO tasks (user_id, title, description, status_id, due_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
  
    try {
      const result = await query(add_task_query, [user_id, title, description, status_id, due_date]);
      return result.rows[0];
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  };

  export const updateTask_POSTGRES = async ({id, title, description, status_id, due_date}:Task) => {
    const update_task_query = `
      UPDATE tasks
      SET title = $2, description = $3, status_id = $4, due_date = $5, updated_at = NOW()
      WHERE id = $1
      RETURNING *;
    `;
  
    try {
      const result = await query(update_task_query, [id, title, description, status_id, due_date]);
      return result.rows[0];
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };
  
  
  export const getTasksForUser_POSTGRES = async (user_id: any) => {
    const get_tasks_query = `
      SELECT tasks.*, task_statuses.status 
      FROM tasks
      JOIN task_statuses ON tasks.status_id = task_statuses.id
      WHERE user_id = $1
      ORDER BY due_date ASC;
    `;
  
    try {
      const result = await query(get_tasks_query, [user_id]);
      return result.rows;
    } catch (error) {
      console.error("Error retrieving tasks for user:", error);
      throw error;
    }
  };

  
  export const deleteTask_POSTGRES = async (id: any) => {
    const delete_task_query = `
      DELETE FROM tasks
      WHERE id = $1
      RETURNING *;
    `;
  
    try {
      const result = await query(delete_task_query, [id]);
      if (result.rowCount === 0) {
        throw new Error(`Task with ID ${id} does not exist.`);
      }
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };
  