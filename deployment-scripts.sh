# scripts/before_install.sh
#!/bin/bash
# Install Node.js and npm
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs
sudo yum install -y npm

# Clean up existing application files
if [ -d "/home/ec2-user/nodejs-app" ]; then
    sudo rm -rf /home/ec2-user/nodejs-app
fi

# scripts/after_install.sh
#!/bin/bash
cd /home/ec2-user/nodejs-app
npm install
sudo chown -R ec2-user:ec2-user /home/ec2-user/nodejs-app

# scripts/start_application.sh
#!/bin/bash
cd /home/ec2-user/nodejs-app

# Install PM2 if not already installed
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
fi

# Stop existing application
pm2 stop nodejs-app || true
pm2 delete nodejs-app || true

# Start new application
pm2 start app.js --name nodejs-app
pm2 save

# scripts/validate_service.sh
#!/bin/bash
sleep 10
curl http://localhost:3000/health || exit 1
