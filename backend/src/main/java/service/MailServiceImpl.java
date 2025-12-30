package service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

/**
 * Created by Tungtpat05 on Oct 21, 2025.
 */
@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender mailSender;

    // Dùng MIME vì gửi được dạng HTML
    // Gửi mail cho bộ phận hỗ trợ
    @Override
    public void sendSupportMail(String name, String phone, String email, String topic, String message) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "UTF-8");

            helper.setTo("nguyentungtpat@gmail.com");
            helper.setSubject("Yêu cầu hỗ trợ từ: " + name + " - " + topic);

            StringBuilder content = new StringBuilder();
            content.append("<h3>Thông tin khách hàng:</h3>")
                    .append("<p><b>Họ tên:</b> ").append(name).append("</p>")
                    .append("<p><b>SĐT:</b> ").append(phone).append("</p>")
                    .append("<p><b>Email:</b> ").append(email).append("</p>")
                    .append("<p><b>Chủ đề:</b> ").append(topic).append("</p>")
                    .append("<h4>Nội dung:</h4>")
                    .append("<p>").append(message).append("</p>");

            helper.setText(content.toString(), true); // true = cho phép HTML
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    // Gửi mail xác nhận lại cho khách
    @Override
    public void sendConfirmationMail(String toEmail, String name) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Xác nhận yêu cầu hỗ trợ - TH ELECTRIC FAN");

            StringBuilder content = new StringBuilder();
            content.append("<p>Chào ").append(name).append(",</p>")
                    .append("<p>Cảm ơn bạn đã liên hệ với <b>TH ELECTRIC FAN</b>.</p>")
                    .append("<p>Đội ngũ của chúng tôi đã nhận được yêu cầu của bạn ")
                    .append("và sẽ phản hồi trong vòng 2 giờ làm việc.</p>")
                    .append("<br>")
                    .append("<p>Trân trọng,</p>")
                    .append("<p><b>Đội ngũ hỗ trợ khách hàng - TH ELECTRIC FAN</b></p>");

            helper.setText(content.toString(), true); // true = cho phép HTML
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
