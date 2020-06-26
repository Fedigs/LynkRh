package com.Rhlynk.pojo;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.web.multipart.MultipartFile;

import com.Rhlynk.entities.Candidat;

public class Utilis {
	public static String upload(String photoUrl, MultipartFile photo) throws Exception {
		// TODO Auto-generated method stub
		if (photo != null) {
			if (!photo.getOriginalFilename().endsWith("jpeg") && !photo.getOriginalFilename().endsWith("jpg")
					&& !photo.getOriginalFilename().endsWith("png"))
				throw new Exception("Format de la photo insupportable");
			try {
				System.out.println(photo.getOriginalFilename());
				String uploadsDir = "/uploads/";
				String realPathtoUploads = System.getProperty("user.dir") + uploadsDir;
				System.out.println(realPathtoUploads);
				if (!new File(realPathtoUploads).exists()) {
					new File(realPathtoUploads).mkdir();
				}
				int point = photo.getOriginalFilename().lastIndexOf(".");
				String orgName = photo.getOriginalFilename().substring(0, point) + "_" + System.currentTimeMillis()
						+ photo.getOriginalFilename().substring(point);
				String filePath = realPathtoUploads + orgName;
				File dest = new File(filePath);
				photo.transferTo(dest);
				if (photoUrl != null) {
					deletePhoto(realPathtoUploads + photoUrl);
				}
				return orgName;
			} catch (Exception e) {
				throw new Exception("Une erreur est survenue lors de l'upload");
			}
		}
		return null;
	}

	public static String uploadCv(String cvUrl, String newName, MultipartFile photo) throws Exception {
		// TODO Auto-generated method stub
		if (photo != null) {
			if (!photo.getOriginalFilename().endsWith("pdf") && !photo.getOriginalFilename().endsWith("doc")
					&& !photo.getOriginalFilename().endsWith("docx"))
				throw new Exception("Format du cv insupportable");
			try {
				System.out.println(photo.getOriginalFilename());
				String uploadsDir = "/uploads/";
				String realPathtoUploads = System.getProperty("user.dir") + uploadsDir;
				System.out.println(realPathtoUploads);
				if (!new File(realPathtoUploads).exists()) {
					new File(realPathtoUploads).mkdir();
				}
				int point = photo.getOriginalFilename().lastIndexOf(".");
				Date d = new Date();
				String orgName = newName + "_cv_" + (d.getDay() + "_" + d.getMonth() + "_" + d.getYear())
						+ photo.getOriginalFilename().substring(point);
				String filePath = realPathtoUploads + orgName;
				File dest = new File(filePath);

				if (cvUrl != null) {
					deletePhoto(realPathtoUploads + cvUrl);
				}
				photo.transferTo(dest);
				System.out.println(dest);
				return orgName;
			} catch (Exception e) {
				System.out.println(e);
				throw new Exception("Une erreur est survenue lors de l'upload");
			}
		}
		return null;
	}

	public static void deletePhoto(String path) throws Exception {
		try {

			File file = new File(path);

			if (file.delete()) {
				System.out.println(file.getName() + " is deleted!");
			} else {
				System.out.println("Delete operation is failed.");
			}

		} catch (Exception e) {

			throw new Exception("Erreur de supprimer de la photo précedente");

		}
	}

	public static byte[] displayImage(String photoUrl) {
		// TODO Auto-generated method stub
		String uploadsDir = "\\uploads\\";
		String realPathtoUploads = System.getProperty("user.dir") + uploadsDir;

		try {
			FileInputStream input = new FileInputStream(new File(realPathtoUploads + photoUrl));
			return IOUtils.toByteArray(input);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			return null;
		}
	}

	public static void downloadCv(Candidat c, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String uploadsDir = "\\uploads\\";
		String realPathtoUploads = System.getProperty("user.dir") + uploadsDir;

		try {
			FileInputStream input = new FileInputStream(new File(realPathtoUploads + c.getCvUrl()));
			response.setContentType("application/force-download");
			response.setHeader("Content-Disposition", "attachment; filename=" + c.getCvUrl());
			IOUtils.copy(input, response.getOutputStream());
			response.flushBuffer();
			input.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
		}
	}
}
