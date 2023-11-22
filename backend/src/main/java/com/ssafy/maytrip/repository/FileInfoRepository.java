package com.ssafy.maytrip.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.maytrip.domain.FileInfo;


public interface FileInfoRepository extends JpaRepository<FileInfo, Integer> {

	FileInfo findByBoardId(Integer id);

}