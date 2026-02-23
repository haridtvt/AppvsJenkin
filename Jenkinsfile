pipeline {
    agent any
    tools {
        nodejs 'nodejs' 
    }
    environment {
        DB_HOST = 'devops-db-instance.crkaokm4y64r.ap-southeast-1.rds.amazonaws.com'
        DB_USER = 'admin'
        DB_PASS = credentials('db-password-id')
        DB_NAME = 'devops_db'
        PORT    = '5000'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Fetching code from Repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    echo 'Installing npm packages...'
                    sh 'npm install'
                }
            }
        }

        stage('Deployment') {
            steps {
                dir('backend') {
                    echo 'Deploying Backend application...'
                    script {
                        // Kill existing process on port 5000 if exists
                        sh "pkill -f 'node server.js' || true"
                        // sh "echo $pwd"
                        echo "Starting Backend on Port 5000..."
                        // Start application in background
                        sh "DB_HOST=${DB_HOST} DB_USER=${DB_USER} DB_PASS=${DB_PASS} DB_NAME=${DB_NAME} PORT=${PORT} nohup node server.js > app.log 2>&1 &"
                        sh "sleep 3 && cat /var/jenkins_home/workspace/dev-project/backend/server.log"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: Backend deployed successfully.'
        }
        failure {
            echo 'FAILURE: Deployment failed. Please check the logs.'
        }
    }
}