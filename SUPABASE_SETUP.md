# How to Get Supabase Database Connection Details

## Step-by-Step Instructions:

### 1. Navigate to Database Settings
From your Supabase dashboard:
- Click on "Settings" in the left sidebar (gear icon)
- Select "Database" from the settings menu

### 2. Find Connection Info
Look for one of these sections:
- "Connection string"
- "Connection info" 
- "Database settings"
- "Connection parameters"

### 3. Get the Connection String
You should see something like:
```
postgresql://postgres.abc123:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres
```

### 4. Also Get Individual Components:
- **Host:** `aws-0-us-west-1.pooler.supabase.com` (or similar)
- **Port:** `5432`
- **Database:** `postgres`
- **User:** `postgres.abc123` (or similar)
- **Password:** The password you set when creating the project

### 5. Alternative: Use Direct Connection
If you see both "Transaction" and "Direct" connection options, choose "Direct" for better compatibility.

## What to Copy:
Please copy and provide:
1. The full DATABASE_URL connection string
2. The individual components (host, port, username, password, database name)

This will allow me to configure your CareerBoost platform to use your Supabase database.