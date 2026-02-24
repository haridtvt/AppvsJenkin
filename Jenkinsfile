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
        PORT    = '5001'
        NGINX_PATH = '/usr/share/nginx/html'
        SONAR_SERVER_NAME = 'sonar-server'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Fetching code from Repository...'
                checkout scm
            }
        }
stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${SONAR_SERVER_NAME}") {
                    script {
                        sh "npm install -g sonar-scanner || true" 
                        sh """
                            sonar-scanner \
                            -Dsonar.projectKey=devops-project \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=http://47.130.213.157:9000 \
                            -Dsonar.login=sqa_66f9ae566af90f6e1613baf2b7f67ee93f96bb52
                        """
                    }
                }
            }
        }

        stage("Quality Gate") {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
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
                        sh "fuser -k 5001/tcp || true"
                        
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
        stage('Deploy Frontend') {
            steps {
                echo 'Deploying Frontend to Nginx webroot...'
                sh "cp -v frontend/* ${NGINX_PATH}/"
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