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
                    sh 'npm install -g pm2'
                }
            }
        }

        stage('Deployment') {
            steps {
                dir('backend') {
                    script {
                        echo 'Deploying with PM2...'
                        sh "pm2 delete devops-backend || true"
                        sh """
                            DB_HOST=${DB_HOST} \
                            DB_USER=${DB_USER} \
                            DB_PASS=${DB_PASS} \
                            DB_NAME=${DB_NAME} \
                            PORT=5000 \
                            pm2 start server.js --name devops-backend
                        """
                        sh "pm2 list"
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