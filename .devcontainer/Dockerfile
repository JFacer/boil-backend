# For more information, please refer to https://aka.ms/vscode-docker-python
FROM node:14.18.1-buster as node-dev

# Install Tools
#RUN apt-get update
RUN apt-get install git
# Increase number of os watched files
#RUN bash -c 'echo "fs.inotify.max_user_watches=635199" >> /etc/sysctl.conf'

#RUN mkdir /workspace/
#COPY ./package.json /workspace/
RUN npm install -g nodemon
RUN npm install 
#RUN npm install -g express-generator
#RUN npm install -g npm typescript --no-cache
#RUN npm install -g @angular/cli

# Create the user
# Switching to a non-root user, please refer to https://aka.ms/vscode-docker-python-user-rights
ARG USERNAME="node"
ARG USERGROUP="node"
#ARG USER_UID=1000
#ARG USER_GID=$USER_UID

# Prepare working directory
WORKDIR /workspace
RUN chown -R $USERNAME:$USERGROUP /workspace/
RUN chmod -R 775 /workspace

#RUN groupadd --g sudo $USERNAME && \
#RUN groupadd --gid $USER_GID $USERNAME && \
#    useradd -m -s /bin/bash --uid $USER_UID -g $USER_GID $USERNAME 

# Finally switch to node user to work
USER $USERNAME

#CMD ["tail", "-f /dev/null"]
CMD [ "sleep", "infinity" ]