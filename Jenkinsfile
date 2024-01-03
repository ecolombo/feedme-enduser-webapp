pipeline { 

    agent any

    triggers {
        pollSCM('* * * * *')
    }

    stages {

        stage('Source checkout') {
            steps {
                echo 'Cloning source code is finished.'
            }
        }

        stage('Test') {
            steps {
                echo 'Cloning source test is finished.'
            }
        }

        stage('Docker build') {
            steps {
                echo 'Build docker image'
                sh ''' docker image build -t feedme-admin-webapp .'''
            }
        }

        stage('Docker deploy') {
            steps {
                echo '----------------- This is a docker deployment phase ----------'
                sh '''
                (if  [ $(docker ps -a | grep feedme-enduser-webapp-container | cut -d " " -f1) ]; then \
                        echo $(docker rm -f feedme-enduser-webapp-container); \
                        echo "---------------- successfully removed feedme-admin-webapp ----------------"
                     else \
                    echo OK; \
                 fi;);
                docker container run --network feedme-webapp-network --restart always --name feedme-enduser-webapp-container -p 4400:80 -d feedme-admin-webapp
            '''
            }
        }
    }
}
