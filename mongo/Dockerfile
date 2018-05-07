FROM mongo:3

# Add scripts
COPY scripts /scripts
RUN chmod +x /scripts/*.sh
RUN touch /.frun
RUN apt-get update && apt-get install -y netcat
# Command to run
ENTRYPOINT ["/scripts/run.sh"]
CMD [""]

# Expose listen port
EXPOSE 27017

# Expose our data volumes
VOLUME ["/data"]
