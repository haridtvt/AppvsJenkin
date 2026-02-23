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

        stage('Deploy Backend') {
            steps {
                dir('backend') {
                    script {
                        sh "fuser -k 6000/tcp || true"
                        
                        sh """
                        export JENKINS_NODE_COOKIE=dontKillMe
                            export DB_HOST='devops-db-instance.crkaokm4y64r.ap-southeast-1.rds.amazonaws.com'
                            export DB_USER='admin'
                            export DB_PASS='${DB_PASS}'
                            export DB_NAME='devops_db'
                            export PORT=5000
                            nohup node server.js > app.log 2>&1 &
                        """
                        sh "sleep 5 && cat backend_deploy.log"
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