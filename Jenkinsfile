@Library("shared") _
pipeline {
    agent { label "vinod" }
    
    stages {
        stage("hello"){
            steps{
                script{
                    hello()
                }
            }
        }
        stage("code") {
            steps {
                script{
                    clone("https://github.com/Sanskar-1singh/first_express_server.git","master")
                }
            }
        }
        stage("build") {
            steps {
                echo "this is building the code"
                echo "this is building the code"
                sh "docker build -t finaldeploy ."
                echo "code successfully built docker image"
            }
        }
        stage("Test") {
            steps {
                echo "this is tesddting the code"
            }
        }
        
        stage('Approval') {
            steps {
                input "Deploy to Production?"
            }
        }
        stage("Deploy to Production") {
            steps {
                echo "this is deployinggg the code"
                sh """
                    docker rm -f finaldeploy || true
                    docker run -d --name finaldeploy -p 3000:3000 finaldeploy
                    sleep 5

                    if [ "\$(docker ps -q -f name=finaldeploy)" = "" ]; then
                        echo "Container crashed!"
                        docker logs finaldeploy
                        exit 1
                    fi
                """
            }
        }
    }
     post {
        failure {
            emailext(
                to: "mailerservice812@gmail.com",
                subject: "❌ Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                Job: ${env.JOB_NAME}
                Build: #${env.BUILD_NUMBER}
                Result: ${currentBuild.currentResult}
                URL: ${env.BUILD_URL}
                """
            )
        }
    }
}
