package com.iut.pph.controller;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.ws.rs.Produces;

/**
 * Created by A665772 on 21/05/2017.
 */
@RestController
@CrossOrigin()
@RequestMapping(value = "/pph/api/auth")
@Api(value = "/pph/api/auth", description = "Operations about files uploading")
@Produces({"application/json"})
public class FileUploaderController {


}
