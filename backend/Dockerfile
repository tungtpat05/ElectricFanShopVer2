# Dùng image Tomcat có sẵn (phiên bản 10.1, JDK 17)
FROM tomcat:10.1-jdk17-temurin

# Xóa toàn bộ ứng dụng mặc định (vd: ROOT, docs, examples…)
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy file WAR đã build sẵn và đổi tên thành ROOT.war để Tomcat deploy trực tiếp
COPY target/elecfanshop-1.0-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war

# Mở cổng 8080 để truy cập từ bên ngoài
EXPOSE 8080

# Khởi chạy Tomcat
CMD ["catalina.sh", "run"]

